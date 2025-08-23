import process from "child_process"
import chalk from "chalk"
import ora from "ora"

const spinner = ora({
  text: "cx-cli 正在更新....",
  spinner: {
    interval: 300,
    frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"].map((item) =>
      chalk.blue(item)
    ),
  },
})

// 更新 cx-cli 到最新版本
export function update() {
  spinner.start()
  process.exec("npm install cx-cli@latest -g", (error) => {
    spinner.stop()
    if (!error) {
      console.log(chalk.green("更新成功"))
    } else {
      console.log(chalk.red(error))
    }
  })
}
