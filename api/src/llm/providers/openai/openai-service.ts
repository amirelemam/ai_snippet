import prompts from "../../prompts";
import openaiClient from "./openai-client";
import logger from "../../../common/logger";

/**
 * Generate a summary for a given text using OpenAI
 * @param text The text to summarize
 * @returns A generated summary
 */
export const generateSummary = async ({text, model = 'gpt-4o-mini', maxTokens = 150}: {text: string, model?: string, maxTokens?: number}): Promise<string> => {
  try {
    if (!text || text.trim() === '') {
      throw new Error('Text cannot be empty');
    }

    const response = await openaiClient().chat.completions.create({
      model,
      messages: [
        {
          role: 'system', 
          content: prompts.SNIPPET_SUMMARY
        },
        {
          role: 'user', 
          content: text
        }
      ],
      max_tokens: maxTokens
    });

    let summary = '';
    if (response.choices[0].message.content) {
      summary = response.choices[0].message.content.trim();
    } else {
      logger.error('No summary generated');
    }

    return summary;
  } catch (error) {
    logger.error('Summary generation error:', error);
    throw new Error('Failed to generate summary');
  }
};