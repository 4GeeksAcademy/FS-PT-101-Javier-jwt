const url = import.meta.env.VITE_BACKEND_URL;

const userServices = {};

// el registro y el login son SIEMPRE POST
userServices.register = async (formData) => {
  try {
    const resp = await fetch(url + "/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

userServices.login = async (formData) => {
  try {
    const resp = await fetch(url + "/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    localStorage.setItem('token', data.token)

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};


userServices.getUserInfo = async () => {
    try {
    const resp = await fetch(url + "/api/private", {
        headers: {
            'Content-Type': 'application/json',
            //pasamos el token que tenemos en el localstorage como authorization siempre con 'Bearer ' (hay un espacio entre la r y la comilla)
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    if (!resp.ok) throw Error("Something went wrong");
    const data = await resp.json();
    console.log(data);
    //para almacenar los datos del usuario que es un OBJETO, tenemos que almacenarlos como texto en el localStorage
    //utilizando JSON.stringify()
    localStorage.setItem('user', JSON.stringify(data.user))
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}




export default userServices;
