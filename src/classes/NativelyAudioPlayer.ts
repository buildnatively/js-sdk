import {generateID} from "../utils/generateID";
import globalContext from "../utils/globalThis";

type AudioMetadata = {
    id?: string;
    title?: string;
    artist?: string;
    album?: string;
    genre?: string;
    artwork?: string;
    duration?: number;
    extras?: Record<string, any>;
};

type AudioPlayOptions = AudioMetadata & {
    is_stream?: boolean;
    headers?: Record<string, string>;
    autoplay?: boolean;
    start_position?: number;
    volume?: number;
    speed?: number;
};

type AudioQueueAddOptions = AudioMetadata & {
    play_now?: boolean;
    is_stream?: boolean;
    headers?: Record<string, string>;
};

export class NativelyAudioPlayer {
    private readonly id: string = generateID();

    private buildMetadata(metadata?: AudioMetadata): Record<string, any> {
        const params: Record<string, any> = {};
        if (!metadata) {
            return params;
        }
        if (metadata.id !== undefined) params.id = metadata.id;
        if (metadata.title !== undefined) params.title = metadata.title;
        if (metadata.artist !== undefined) params.artist = metadata.artist;
        if (metadata.album !== undefined) params.album = metadata.album;
        if (metadata.genre !== undefined) params.genre = metadata.genre;
        if (metadata.artwork !== undefined) params.artwork = metadata.artwork;
        if (metadata.duration != null) params.duration = metadata.duration;
        if (metadata.extras !== undefined) params.extras = metadata.extras;
        return params;
    }

    play(source: string, options?: AudioPlayOptions, play_callback?: Function): void {
        const params: Record<string, any> = {
            source,
            is_stream: options?.is_stream ?? false,
            autoplay: options?.autoplay ?? true,
            ...this.buildMetadata(options),
        };

        if (options?.headers !== undefined) params.headers = options.headers;
        if (options?.start_position != null) params.start_position = options.start_position;
        if (options?.volume != null) params.volume = options.volume;
        if (options?.speed != null) params.speed = options.speed;

        globalContext?.natively.trigger(this.id, 39, play_callback, "audio_play", params);
    }

    pause(pause_callback?: Function): void {
        globalContext?.natively.trigger(this.id, 39, pause_callback, "audio_pause", {});
    }

    stop(stop_callback?: Function): void {
        globalContext?.natively.trigger(this.id, 39, stop_callback, "audio_stop", {});
    }

    seek(position: number, seek_callback?: Function): void {
        globalContext?.natively.trigger(this.id, 39, seek_callback, "audio_seek", {
            position,
        });
    }

    queueAdd(
        source: string,
        options?: AudioQueueAddOptions,
        queue_add_callback?: Function,
    ): void {
        const params: Record<string, any> = {
            source,
            play_now: options?.play_now ?? false,
            is_stream: options?.is_stream ?? false,
            ...this.buildMetadata(options),
        };

        if (options?.headers !== undefined) params.headers = options.headers;

        globalContext?.natively.trigger(
            this.id,
            39,
            queue_add_callback,
            "audio_queue_add",
            params,
        );
    }

    queueGet(queue_get_callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            39,
            queue_get_callback,
            "audio_queue_get",
            {},
        );
    }

    queueRemove(index: number, queue_remove_callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            39,
            queue_remove_callback,
            "audio_queue_remove",
            { index },
        );
    }

    setMetadata(metadata: AudioMetadata, set_metadata_callback?: Function): void {
        const params = this.buildMetadata(metadata);
        globalContext?.natively.trigger(
            this.id,
            39,
            set_metadata_callback,
            "audio_set_metadata",
            params,
        );
    }

    setVolume(volume: number, set_volume_callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            39,
            set_volume_callback,
            "audio_set_volume",
            { volume },
        );
    }

    setSpeed(speed: number, set_speed_callback?: Function): void {
        globalContext?.natively.trigger(
            this.id,
            39,
            set_speed_callback,
            "audio_set_speed",
            { speed },
        );
    }
}
