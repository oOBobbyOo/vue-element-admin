import Clipboard from 'clipboard'
import { Message } from 'element-ui'

function clipboardSuccess() {
  Message({ message: 'Copy successfully', type: 'success', duration: 500 })
}

function clipboardError() {
  Message({ message: 'Copy failed', type: 'error' })
}

export default function handleClipboard(text: any, event: any) {
  const clipboard = new Clipboard(event.target, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess()
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError()
    clipboard.destroy()
  })
}
