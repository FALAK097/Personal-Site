"use server";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to get access token: ${response.status} ${response.statusText}`
    );
  }

  const data = await response.json();

  if (!data.access_token) {
    throw new Error("Invalid token response: missing access_token");
  }

  return data;
};

export async function getNowPlaying() {
  try {
    const { access_token } = await getAccessToken();

    if (!access_token) {
      console.error("No access token received");
      return { isPlaying: false };
    }

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      cache: "no-store",
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false };
    }

    const song = await response.json();

    if (!song?.item) {
      console.warn("Invalid song data received from Spotify API");
      return { isPlaying: false };
    }

    return {
      album: song.item.album?.name || "Unknown Album",
      albumImageUrl: song.item.album.images[0]?.url,
      artist:
        song.item.artists?.map((artist) => artist.name).join(", ") ||
        "Unknown Artist",
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls?.spotify,
      title: song.item.name || "Unknown Title",
    };
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return { isPlaying: false };
  }
}
