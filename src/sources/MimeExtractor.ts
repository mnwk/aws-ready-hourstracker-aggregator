import parse from 'emailjs-mime-parser'

export class MimeExtractor {
  public static getAttachmentBuffer(mimeFileContent: Buffer, attachmentName: string): Buffer {
    const childNodes = parse(mimeFileContent).childNodes
    const exportAttachment = childNodes.find((item) => {
      if (item.bodystructure.includes(attachmentName) && item.content) {
        return true
      }
      return false
    })
    if (exportAttachment) {
      return new Buffer(exportAttachment.content)
    }
    throw new AttachmentNotFoundException(`Attachment [${attachmentName}] not found.`)
  }
}

export class AttachmentNotFoundException extends Error {
}