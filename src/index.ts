import { Command } from 'commander'
import pkg from '../package.json'
import { create } from './command/create.js'
import { update } from './command/update.js'

// 这里我们用 cxin 当作我的指令名称
// 命令行中使用 cxin xxx 即可触发
const program = new Command('cxin')

// .vesion 表示可以使用 -V --version 参数查看当前SDK版本
// 我们直接使用 package.json 中的 version 即可
program.version(pkg.version, '-v, -V, --version')

// 创建命令
program
.command('create')
.description('创建一个新项目')
.argument('[name]', '项目名称')
.action(async (name) => {
  create(name)
})

// 更新命令
program
  .command('update')
  .description('更新 cxin 至最新版本')
  .action(async () => {
    await update()
  })

// parse 会解析 process.argv 中的内容
// 也就是我们输入的指令
program.parse()