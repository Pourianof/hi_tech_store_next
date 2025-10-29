export const MODAL_CONTAINER_ID = "modal-container";

// This is for mounting modal in specific and fixed place instead
// of append it in body. this can help when using <Script> component
export function ModalContainer() {
  return <div id={MODAL_CONTAINER_ID}></div>;
}
