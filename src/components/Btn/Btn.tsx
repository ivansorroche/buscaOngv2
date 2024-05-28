import styles from './styles.module.scss'
export default function Btn(props: any){

    function btnFunction() {
            props.actionButton(props.type)
    }
    return (

        <button type="button"className={`${styles.buttonStyles} btn btn-primary`} onClick={() => btnFunction()} disabled={props.isDisabled}>{props.label}</button>
 
    )
}