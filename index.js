const execAsync = require('./app/lib/ShellSpawn')

let main = async function () {
  let commandList = [
    'docker-compose run app node /app/index.js',
    "docker-compose run crop python /app/main.py"
  ]

  for (let i = 0; i < commandList.length; i++) {
    console.log(commandList[i])
    await execAsync(commandList[i])
  }
}

main()