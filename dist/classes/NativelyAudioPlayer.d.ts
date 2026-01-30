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
export declare class NativelyAudioPlayer {
    private readonly id;
    private buildMetadata;
    play(source: string, options?: AudioPlayOptions, play_callback?: Function): void;
    pause(pause_callback?: Function): void;
    stop(stop_callback?: Function): void;
    seek(position: number, seek_callback?: Function): void;
    queueAdd(source: string, options?: AudioQueueAddOptions, queue_add_callback?: Function): void;
    queueGet(queue_get_callback?: Function): void;
    queueRemove(index: number, queue_remove_callback?: Function): void;
    setMetadata(metadata: AudioMetadata, set_metadata_callback?: Function): void;
    setVolume(volume: number, set_volume_callback?: Function): void;
    setSpeed(speed: number, set_speed_callback?: Function): void;
}
export {};
