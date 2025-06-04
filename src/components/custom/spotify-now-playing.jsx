"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Disc3, Music } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

export const SpotifyNowPlaying = ({ songData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const isPlaying = songData?.isPlaying;
  const hasData = songData && (songData.title || songData.artist);
  const loading = !songData;

  useEffect(() => {
    setImageError(false);
  }, [songData?.albumImageUrl]);

  const renderAlbumArt = () => {
    if (loading) {
      return (
        <div className="w-full h-full bg-purple-500/20 flex items-center justify-center">
          <Disc3 className="w-6 h-6 text-purple-500 animate-spin" />
        </div>
      );
    }

    if (!hasData || !songData.albumImageUrl || imageError) {
      return (
        <div className="w-full h-full bg-purple-500/20 flex items-center justify-center">
          <Music className="w-6 h-6 text-purple-500" />
        </div>
      );
    }

    return (
      <motion.img
        src={songData.albumImageUrl}
        alt={songData.album || "Album Art"}
        className="w-full h-full object-cover"
        animate={{ rotate: isPlaying && !prefersReducedMotion ? 360 : 0 }}
        transition={{
          duration: 8,
          repeat:
            isPlaying && !prefersReducedMotion ? Number.POSITIVE_INFINITY : 0,
          ease: "linear",
        }}
        onError={() => setImageError(true)}
      />
    );
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <motion.div
            className="relative group cursor-pointer"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: prefersReducedMotion ? 1 : 1.05 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <motion.div
              className="relative w-48 h-16 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/20 rounded-xl overflow-hidden shadow-lg"
              style={{ transform: "rotate(10deg)" }}
              animate={{
                boxShadow: isHovered
                  ? "0 20px 40px rgba(168, 85, 247, 0.4)"
                  : "0 8px 16px rgba(168, 85, 247, 0.2)",
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20"
                animate={{
                  x:
                    isPlaying && !prefersReducedMotion
                      ? ["-100%", "100%"]
                      : "0%",
                }}
                transition={{
                  duration: 3,
                  repeat:
                    isPlaying && !prefersReducedMotion
                      ? Number.POSITIVE_INFINITY
                      : 0,
                  ease: "linear",
                }}
              />

              <div className="relative flex items-center h-full p-2 gap-2">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                  {renderAlbumArt()}
                </div>

                <div className="flex-1 min-w-0">
                  {loading ? (
                    <div className="space-y-1">
                      <div className="h-3 bg-purple-500/20 rounded animate-pulse" />
                      <div className="h-2 bg-purple-500/10 rounded animate-pulse w-3/4" />
                    </div>
                  ) : hasData ? (
                    <div className="space-y-0.5">
                      <div className="overflow-hidden">
                        <motion.div
                          className="text-xs font-semibold text-foreground whitespace-nowrap"
                          animate={{
                            x:
                              songData.title &&
                              songData.title.length > 20 &&
                              !prefersReducedMotion
                                ? [0, -100, 0]
                                : 0,
                          }}
                          transition={{
                            duration: 6,
                            repeat: prefersReducedMotion
                              ? 0
                              : Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        >
                          {songData.title || "Unknown Track"}
                        </motion.div>
                      </div>
                      <div className="overflow-hidden">
                        <motion.div
                          className="text-xs text-foreground/70 whitespace-nowrap"
                          animate={{
                            x:
                              songData.artist &&
                              songData.artist.length > 25 &&
                              !prefersReducedMotion
                                ? [0, -80, 0]
                                : 0,
                          }}
                          transition={{
                            duration: 5,
                            repeat: prefersReducedMotion
                              ? 0
                              : Number.POSITIVE_INFINITY,
                            ease: "linear",
                            delay: 1,
                          }}
                        >
                          {songData.artist || "Unknown Artist"}
                        </motion.div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center h-full">
                      <div className="text-xs font-medium text-foreground/60">
                        Not playing
                      </div>
                      <div className="text-xs text-foreground/40">Spotify</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="absolute top-1 right-1">
                {isPlaying && (
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                )}
              </div>
            </motion.div>
          </motion.div>
        </TooltipTrigger>
        <AnimatePresence>
          {isHovered && (
            <TooltipContent
              side="bottom"
              className="bg-transparent text-purple-500 border-purple-500/30"
            >
              {hasData ? (
                <>
                  <div className="font-medium">Now vibing 🎧 to</div>
                  <div className="text-purple-300">{songData?.title}</div>
                </>
              ) : (
                <span>404: Probably coding in silence.</span>
              )}
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  );
};
