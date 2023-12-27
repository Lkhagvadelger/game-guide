import fs from 'fs';
import { Readable } from 'stream';
import util from 'util'
export const getAudioWebmFile = async (messageId: string) => {
  return await fs.createReadStream(`./public/messages/audio/${messageId}.webm`)
}

export const saveAudiobase64ToFile = async (audioBase64: string, messageId: string) => {
  const buffer = await Buffer.from(
    audioBase64.split(',')[1],  // only use encoded data after "base64,"
    'base64'
  )
  const readable = new Readable()
  readable._read = () => { } // _read is required but you can noop it
  readable.push(buffer)
  await fs.writeFileSync(`./public/messages/audio/${messageId}.webm`, buffer)
}
export const saveGoogleAudioFileToDisk = async (audioContent: any, messageId: string) => {
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(`./public/messages/audio/${messageId}.mp3`, audioContent, 'binary');
}
export const saveOpenAIAudioFileToDisk = async (arrayBuffer: ArrayBuffer, messageId: string) => {
  const filePath = `./public/messages/audio/`;
  const buffer = Buffer.from(arrayBuffer);
  await fs.promises.writeFile(`${filePath}${messageId}.mp3`, buffer);
  return { filePath, fileName: `${messageId}.mp3` }
}
