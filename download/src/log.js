// Packages
import assert from 'assert'
import chalk from 'chalk'
import Progress from 'progress'

let bar

export function enableProgress(text) {
  assert(!bar)

  bar = new Progress(`> ${text} [:bar] :percent`, {
    stream: process.stdout,
    width: 20,
    complete: '=',
    incomplete: ' ',
    total: 100
  })
}

export function info(text) {
  console.log(`> ${text}`)
}

export function warn(text) {
  console.log(chalk.red('> Warning!'), text)
}

export function showProgress(percentage) {
  assert(bar)
  bar.update(percentage / 100)
}

export function disableProgress() {
  assert(bar)

  // It is auto-completed once it updates to 100
  // otherwise it outputs a blank line
  if (!bar.complete) {
    bar.terminate()
  }

  bar = undefined
}
