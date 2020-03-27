import axios from "axios"

//params for the airtable
const app_id = process.env.GATSBY_AIRTABLE_BASE_ID
const app_key = process.env.GATSBY_AIRTABLE_API_KEY

const view = "MailingList"

export const addEmail = (name, email) => {

  const data = {
    records: [
      {
        fields: {
          Name: name,
          Email: email,
        },
      },
    ],
  }

  let url = "https://api.airtable.com/v0/" + app_id + "/" + view
  let axiosConfig = {
    headers: {
      Authorization: "Bearer " + app_key,
      "Content-Type": "application/json",
    },
  }

  axios
    .post(url, data, axiosConfig)
    .then(resp => console.log("Email received"))
    .catch(error => console.log(error))
}
