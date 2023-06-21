export function getUUID (): string {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c: string): string => {
    //   return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
    // })
    let uuid = ''
    for (let i = 0; i < 36; i++) {
        if(i === 8 || i === 13 || i === 18 || i === 23) {
            uuid += '-'
        } else if(i === 14) {
            uuid += '4'
        } else {
            const r = Math.random() * 16 | 0
            const c = (i === 19) ? ('r&0x3' | '0x8') : r
            uuid += c.toString(16)
        }
    }
    return uuid
  }
