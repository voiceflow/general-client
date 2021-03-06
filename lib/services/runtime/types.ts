import { IntentRequest, NodeID, Request, RequestType, TextRequest } from '@voiceflow/general-types';
import { Runtime } from '@voiceflow/runtime';

export type RuntimeRequest = Request | null;

export type GeneralRuntime = Runtime<RuntimeRequest>;

export const isTextRequest = (request: RuntimeRequest): request is TextRequest => {
  return !!(request?.type === RequestType.TEXT && typeof request.payload === 'string');
};

export const isIntentRequest = (request: RuntimeRequest): request is IntentRequest => {
  return !!(
    request?.type === RequestType.INTENT &&
    (request as IntentRequest).payload?.intent?.name &&
    Array.isArray((request as IntentRequest).payload.entities)
  );
};

export const isRuntimeRequest = (request: any): request is RuntimeRequest => {
  return request === null || !!(typeof request.type === 'string' && !!request.type && request.payload);
};

export const isGeneralRequest = (request: RuntimeRequest): request is Request<string, { name: string }> => {
  return !!(request as Request<string, { name: string }>)?.payload.name;
};

export enum StorageType {
  USER = 'user',
  OUTPUT = 'output',
  LOCALE = 'locale',
  REPEAT = 'repeat',
  SESSIONS = 'sessions',
  STREAM_PLAY = 'streamPlay',
  ACCESS_TOKEN = 'accessToken',
  STREAM_PAUSE = 'streamPause',
  STREAM_FINISHED = 'streamFinished',
  NO_MATCHES_COUNTER = 'noMatchesCounter',
}

export enum StreamAction {
  END = 'END',
  NEXT = 'NEXT',
  START = 'START',
  PAUSE = 'PAUSE',
  RESUME = 'RESUME',
  NOEFFECT = 'NOEFFECT',
}

export enum StreamAudioDirective {
  ENQUEUE = 'ENQUEUE',
  REPLACE_ALL = 'REPLACE_ALL',
}

export type StreamPlayStorage = {
  src: string;
  loop: boolean;
  token: string;
  action: StreamAction;
  offset: number;
  nodeID: NonNullable<NodeID>;
  nextID?: NodeID;
  pauseID?: NodeID;
  previousID?: NodeID;
};

export type StreamPauseStorage = {
  id: string;
  offset: number;
};

export type OutputStorage = string;

export type NoMatchCounterStorage = number;

export type StorageData = Partial<{
  [StorageType.OUTPUT]: OutputStorage;
  [StorageType.STREAM_PLAY]: StreamPlayStorage;
  [StorageType.STREAM_PAUSE]: StreamPauseStorage;
  [StorageType.NO_MATCHES_COUNTER]: NoMatchCounterStorage;
}>;

export enum TurnType {
  END = 'end',
  TRACE = 'trace',
  AUDIO = 'play',
  REPROMPT = 'reprompt',
  NEW_STACK = 'newStack',
  PREVIOUS_OUTPUT = 'lastOutput',
}

export type PreviousOutputTurn = string;

export type TurnData = Partial<{
  [TurnType.PREVIOUS_OUTPUT]: PreviousOutputTurn;
}>;

export enum FrameType {
  SPEAK = 'speak',
  CALLED_COMMAND = 'calledCommand',
}

export type SpeakFrame = string;

export type FrameData = Partial<{
  [FrameType.SPEAK]: SpeakFrame;
}>;

export enum Variables {
  TIMESTAMP = 'timestamp',
}
