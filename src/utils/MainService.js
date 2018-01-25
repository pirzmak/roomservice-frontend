import { ToastContainer, toast } from 'react-toastify';

const API = "http://localhost:9000//";

export function getMethod(url, onSuccess) {
  fetch(API + url)
    .then(response => response.json())
    .then(data => onSuccess(data));
}

export function postMethod(url, body, onSuccess, onError) {
  body.organizationId = {id: 0};
  fetch(API + url, {
    method: 'post',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(response => response.json())
    .then(data => {

      if(data.status.name === "FAILURE") {
        //onError(data);
        toast.error(data.message);
      }
      else onSuccess(data);
    });
}