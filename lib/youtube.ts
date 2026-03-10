import { google } from 'googleapis';

export interface YouTubeVideo {
    id: string;
    title: string;
    description: string;
    thumbnailUrl: string;
    publishedAt: string;
}

// Inisialisasi API client
const youtube = google.youtube('v3');

export async function getLatestYouTubeVideos(
    channelId: string,
    maxResults: number = 4
): Promise<YouTubeVideo[]> {
    const apiKey = process.env.YOUTUBE_API_KEY;

    if (!apiKey || !channelId) {
        console.warn("YOUTUBE_API_KEY atau channelId belum diatur. Menampilkan video kosong.");
        return [];
    }

    try {
        // Langkah 1: Dapatkan ID Playlist "Uploads" dari Channel
        const channelRes = await youtube.channels.list({
            key: apiKey,
            part: ['contentDetails'],
            id: [channelId],
        });

        const items = channelRes.data.items;
        if (!items || items.length === 0) {
            console.warn("Channel YouTube tidak ditemukan.");
            return [];
        }

        const uploadsPlaylistId = items[0].contentDetails?.relatedPlaylists?.uploads;
        if (!uploadsPlaylistId) {
            console.warn("Playlist upload tidak ditemukan pada channel ini.");
            return [];
        }

        // Langkah 2: Dapatkan video terbaru dari Playlist "Uploads"
        const playlistRes = await youtube.playlistItems.list({
            key: apiKey,
            part: ['snippet'],
            playlistId: uploadsPlaylistId,
            maxResults: maxResults,
        });

        const videos: YouTubeVideo[] = (playlistRes.data.items || []).map((item) => {
            const snippet = item.snippet;
            // Gunakan resolusi gambar terbaik yang tersedia
            const thumbnailUrl =
                snippet?.thumbnails?.maxres?.url ||
                snippet?.thumbnails?.high?.url ||
                snippet?.thumbnails?.medium?.url ||
                snippet?.thumbnails?.default?.url ||
                '';

            return {
                id: snippet?.resourceId?.videoId || '',
                title: snippet?.title || '',
                description: snippet?.description || '',
                thumbnailUrl: thumbnailUrl,
                publishedAt: snippet?.publishedAt || '',
            };
        });

        return videos;
    } catch (error: any) {
        console.warn("Error mengambil video YouTube:", error?.message || "Terjadi kesalahan API");
        return [];
    }
}
