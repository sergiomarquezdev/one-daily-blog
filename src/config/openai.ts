import OpenAI from 'openai';
import { environment } from '../environments/environment';

const configuration = {
  apiKey: environment.openAiApiKeyBlog,
};

export const openai = new OpenAI(configuration);
