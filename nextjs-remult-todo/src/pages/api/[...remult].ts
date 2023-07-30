// src/pages/api/[...remult].ts

import { remultNext } from "remult/remult-next"
import { Task } from "../../shared/Task"
//import { User } from "../../shared/User"

export default remultNext({
  entities: [Task]
})