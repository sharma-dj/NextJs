// src/shared/Task.ts

import { Entity, Fields, Validators } from "remult"

@Entity("tasks", {
  allowApiCrud: true
})
export class Task {
  @Fields.autoIncrement()
  id = ""

  @Fields.string({
    validate:Validators.required
  })
  title = ""

  @Fields.boolean()
  completed = false

  @Fields.createdAt()
  createdAt?: Date
}