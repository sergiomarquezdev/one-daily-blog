import OpenAI from 'openai';
import { environment } from '../app/environments/environment';

const configuration = {
  apiKey: environment.openAiApiKeyBlog,
};

export const openai = new OpenAI(configuration);
