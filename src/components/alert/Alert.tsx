
import { ReactNode } from "react"

import style from '../module/Alert.module.css'

const Alert = ({ children }: { children: ReactNode }) => {
    return (
        <div className={style.alert}>{children}</div>
    )
}

export default Alert