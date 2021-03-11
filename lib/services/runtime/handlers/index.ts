import {
  APIHandler,
  CodeHandler,
  EndHandler,
  FlowHandler,
  IfHandler,
  IntegrationsHandler,
  NextHandler,
  RandomHandler,
  ResetHandler,
  SetHandler,
  StartHandler,
} from '@voiceflow/runtime';

import { Config } from '@/types';

import CaptureHandler from './capture';
import InteractionHandler from './interaction';
import SpeakHandler from './speak';
import StateHandlers from './state';
import StreamHandler from './stream';
import TraceHandler from './trace';
import VisualHandler from './visual';

export const eventHandlers = [CaptureHandler(), InteractionHandler(), TraceHandler()];

export default ({ API_HANDLER_ENDPOINT, INTEGRATIONS_HANDLER_ENDPOINT, CODE_HANDLER_ENDPOINT }: Config) => [
  ...StateHandlers(),
  SpeakHandler(),
  InteractionHandler(),
  CaptureHandler(),
  ResetHandler(),
  StreamHandler(),
  CodeHandler({ endpoint: CODE_HANDLER_ENDPOINT }),
  EndHandler(),
  FlowHandler(),
  IfHandler(),
  APIHandler({ customAPIEndpoint: API_HANDLER_ENDPOINT }),
  IntegrationsHandler({ integrationsEndpoint: INTEGRATIONS_HANDLER_ENDPOINT }),
  RandomHandler(),
  SetHandler(),
  StartHandler(),
  VisualHandler(),
  NextHandler(),
  TraceHandler(),
];
