const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

let clickCount = 0
let keyPressCount = 0
let startTime = null

const startTimer = () => {
  startTime = Date.now()
}

const stopTimer = () => {
  if (startTime) {
    const endTime = Date.now()
    const elapsedTime = (endTime - startTime) / 1000
    console.log(`Elapsed time: ${elapsedTime.toFixed(2)} seconds`)
  }
}

// Listen for mouse clicks
const onClick = () => {
  clickCount++
  console.log(`Mouse click count: ${clickCount}`)
}

const onKeyPress = () => {
  keyPressCount++
  console.log(`       Keyboard typing count: ${keyPressCount}`)
}


process.stdin.on('mouseclick', onClick)
process.stdin.on('keypress', onKeyPress)


rl.question('Press Enter to start counting. Press Ctrl+C to exit.', () => {
  startTimer()
  process.stdin.emit('mouseclick')
  rl.input.on('keypress', () => {
    process.stdin.emit('keypress')
  })


  setInterval(() => {
    if (startTime) {
      const currentTime = Date.now()
      const elapsedTime = (currentTime - startTime) / 1000
      console.clear()
      console.log(`Elapsed time: ${elapsedTime.toFixed(2)} seconds`)
    }
  }, 1000)
})


process.on('SIGINT', () => {
  stopTimer()
  console.log('\nExiting the program.')
  process.exit()
})
