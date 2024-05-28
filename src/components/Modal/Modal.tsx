import Btn from "../Btn/Btn"

export default function Modal(props: any){

  const { formValid, closeModal } = props
    return (
        <div className="modal" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header ">
              <h5 className="modal-title ">{formValid === 'Invalid' ? 'Atenção' : ''}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
            </div>
            <div className="modal-body ">
              <p>{formValid  === 'Invalid' ? 'Dados inválidos, revise-os e envie novamente.' : 'Dados enviados com sucesso!'}</p>
            </div>
            <div className="modal-footer">
              <Btn 
                onClick={closeModal}
                label={"Fechar"}
                actionButton={closeModal} />
            </div>
          </div>
        </div>
      </div>
    )
}