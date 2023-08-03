// src/shared/Task.ts

import { Entity, Fields, Validators } from "remult"

@Entity("tasks", {
  allowApiCrud: true
})
export class Task {
  @Fields.autoIncrement()
  id = ""

  @Fields.string<Task>({
    validate: task => {
      if (task.title.length < 3)
        throw Error("Too short")
    }
  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}