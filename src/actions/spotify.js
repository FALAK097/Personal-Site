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
  return response.json();
};

export async function getNowPlaying() {
  try {
    const { access_token } = await getAccessToken();
    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204 || response.status > 400) {
      return { isPlaying: false };
    }

    const song = await response.json();
    return {
      album: song.item.album.name,
      albumImageUrl: song.item.album.images[0]?.url,
      artist: song.item.artists.map((artist) => artist.name).join(", "),
      isPlaying: song.is_playing,
      songUrl: song.item.external_urls.spotify,
      title: song.item.name,
    };
  } catch (error) {
    console.error("Error fetching Spotify data:", error);
    return { isPlaying: false };
  }
}
