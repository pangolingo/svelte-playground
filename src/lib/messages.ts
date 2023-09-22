import sql from "./db";

export interface SavedMessage {
  id: string;
  user_id: string | null;
  name: string;
  email: string;
  message: string;
  colors: string[]
}

export async function saveMessage({
  userId,
  name,
  email,
  message,
  colors
}: {
  userId: string | null;
  name: string;
  email: string;
  message: string;
  colors: string[]
}): Promise<SavedMessage> {
  const savedMessage = await sql<SavedMessage[]>`
      insert into messages
        (user_id, name, email, message, colors)
      values
        (${userId}, ${name}, ${email}, ${message}, ${colors})
      returning id, user_id, name, email, message, colors
    `
  if (savedMessage.length != 1) {
    throw new Error(`Unexpected number of saved messages inserted: ${savedMessage.length}`)
  }
  return savedMessage[0]
}