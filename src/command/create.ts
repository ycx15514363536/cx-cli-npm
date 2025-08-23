import path from "path"
import fs from "fs-extra"
import { gt } from "lodash"
import chalk from "chalk"
import axios, { type AxiosResponse } from "axios"
import { input, select } from "@inquirer/prompts"
import { clone } from "../utils/clone.js"
import pkg from "../../package.json"
import type { TemplateInfo } from "../types/create.js"

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-Typescript-tempalte",
    {
      name: "Vite-Vue3-Typescript-tempalte",
      downloadUrl: "git@github.com:ycx15514363536/cx-vue-cli.git",
      description: "Vue3技术栈开发模板",
      branch: "feature/vue-cli-pc",
    },
  ],
  [
    "Vite-Vue3-移动端模板",
    {
      name: "Vite-Vue3-Typescript-tempalte",
      downloadUrl: "git@github.com:ycx15514363536/cx-vue-cli.git",
      description: "Vue3技术栈开发模板",
      branch: "feature/vue-cli-mobile",
    },
  ]
])

/**
* 判断是否要覆盖指定文件
*
* @param fileName 要判断的文件名
* @returns 返回一个 Promise，解析为一个布尔值，表示是否覆盖文件
*/
export function isOverwrite(fileName: string): Promise<boolean> {
  console.warn(`${fileName}文件夹存在`)
  return select({
    message: "是否覆盖?",
    choices: [
      { name: "覆盖", value: true },
      { name: "取消", value: false },
    ],
  })
}

/**
* 获取指定npm包的信息
*
* @param npmName npm包的名称
* @returns 返回AxiosResponse对象，如果请求失败则返回null
*/
export const getNpmInfo = async (npmName: string) => {
  const npmUrl = `https://registry.npmjs.org/${npmName}`
  let res = null as AxiosResponse | null

  try {
    res = await axios.get(npmUrl)
  } catch (error) {
    console.error(error)
  }

  return res
}

/**
* 获取npm包的最新版本号
*
* @param name npm包的名称
* @returns 返回该npm包的最新版本号
*/
export const getNpmLatestVersion = async (name: string) => {
  const { data } = (await getNpmInfo(name)) as AxiosResponse
  return data["dist-tags"].latest
}

/**
* 检查给定包名和版本是否需要更新
*
* @param name 包名
* @param version 当前版本
* @returns 如果需要更新返回true，否则返回false
*/
export const checkVersion = async (name: string, version: string) => {
  const latestVersion = await getNpmLatestVersion(name)
  const need = gt(latestVersion, version)
  if (need) {
    console.warn(
      `检查到cx最新版本： ${chalk.blackBright(
        latestVersion
      )}，当前版本是：${chalk.blackBright(version)}`
    )
    console.log(
      `可使用： ${chalk.yellow(
        "npm install cx-cli@latest"
      )}，或者使用：${chalk.yellow("cx update")}更新`
    )
  }
  return need
}

/**
* 创建一个新的项目
*
* @param projectName 项目名称，可选参数。如果不传，则提示用户输入
*/
export async function create(projectName?: string) {
  // 初始化模板列表
  const templateList = Array.from(templates).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item
      return {
        name,
        value: name,
        description: info.description,
      }
    }
  )
  if (!projectName) {
    projectName = await input({ message: "请输入项目名称" })
  }

  // 如果文件夹存在，则提示是否覆盖
  const filePath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(filePath)) {
    const run = await isOverwrite(projectName)
    if (run) {
      await fs.remove(filePath)
    } else {
      return // 不覆盖直接结束
    }
  }

  // 检查版本更新
  await checkVersion(pkg?.name, pkg?.version)

  const templateName = await select({
    message: "请选择模板",
    choices: templateList,
  })
  const info = templates.get(templateName)
  console.log(info)
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch])
  }

  console.log("create", projectName)
}
