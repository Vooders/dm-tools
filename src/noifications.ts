import { Notification  } from 'electron'

export default {
    'characterSaved': (id: number) => new Notification({title: 'Success', body: `Character ${id} saved`})
}
