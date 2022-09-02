export const enum DPadDirection {
  up = 0,
  right = 3,
  down = 1,
  left = 2,
}

export interface DPadEvent extends CustomEvent<{ direction: DPadDirection }> {
  type: 'dpad'
}

const buttonTexts = {
  [DPadDirection.up]: '⬆',
  [DPadDirection.right]: '➡',
  [DPadDirection.down]: '⬇',
  [DPadDirection.left]: '⬅',
}

export class DPad extends EventTarget {
  readonly element = document.createDocumentFragment()

  private ignoreNextClick = false

  constructor() {
    super()

    this.element.append(this.createDirectionButton(DPadDirection.up))
    this.element.append(this.createDirectionButton(DPadDirection.right))
    this.element.append(this.createDirectionButton(DPadDirection.down))
    this.element.append(this.createDirectionButton(DPadDirection.left))
  }

  handleEvent(
    event: (MouseEvent | TouchEvent) & { target: HTMLButtonElement }
  ): void {
    event.preventDefault()
    event.stopPropagation()

    if (event.type === 'touchend') {
      this.ignoreNextClick = true
    } else if (event.type === 'click' && this.ignoreNextClick) {
      this.ignoreNextClick = false
      return
    }

    this.dispatchEvent(
      new CustomEvent('dpad', {
        detail: { direction: Number(event.target.value) },
      })
    )
  }

  private createDirectionButton(dir: DPadDirection): HTMLButtonElement {
    let button = document.createElement('button')
    button.value = String(dir)
    button.textContent = buttonTexts[dir]
    button.addEventListener('click', this, true)
    button.addEventListener('touchend', this, true)
    return button
  }
}
