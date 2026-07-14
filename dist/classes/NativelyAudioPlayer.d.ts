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
type AudioAVAudioSessionCategoryOptionsInput = number | string | Array<number | string>;
type AudioIOSSessionOptions = {
    avAudioSessionCategoryOptions?: AudioAVAudioSessionCategoryOptionsInput;
};
type AudioPlayOptions = AudioMetadata & AudioIOSSessionOptions & {
    is_stream?: boolean;
    headers?: Record<string, string>;
    autoplay?: boolean;
    start_position?: number;
    volume?: number;
    speed?: number;
};
type AudioQueueAddOptions = AudioMetadata & AudioIOSSessionOptions & {
    play_now?: boolean;
    is_stream?: boolean;
    headers?: Record<string, string>;
};
type AudioSampleMode = "duck" | "stop" | "mix";
type AudioSampleOptions = {
    headers?: Record<string, string>;
    start_position?: number;
    sample_duration?: number;
    volume?: number;
    speed?: number;
} & AudioIOSSessionOptions;
export declare class NativelyAudioPlayer {
    private readonly id;
    private buildMetadata;
    play(source: string, options?: AudioPlayOptions, play_callback?: Function): void;
    playSample(url: string, mode: AudioSampleMode, play_sample_callback?: Function, options?: AudioSampleOptions): void;
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
