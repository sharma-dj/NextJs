// src/shared/User.ts

import { Entity, Fields } from "remult"

@Entity("users", {
  allowApiCrud: true
})
export class User {
  @Fields.autoIncrement()
  id = ""

  @Fields.string()
  name = ""

  @Fields.boolean()
  email = false

  @Fields.createdAt()
  createdAt?: Date
}