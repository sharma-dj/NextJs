// src/pages/api/[...remult].ts

import { remultNext } from "remult/remult-next"
import { Task } from "../../shared/Task"
import { TasksController } from "@/shared/TasksController"
import { getUserFromNextAuth } from "./auth/[...nextauth]"

export default remultNext({
  controllers: [TasksController],
  entities: [Task],
  getUser: getUserFromNextAuth
})