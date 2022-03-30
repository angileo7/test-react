export async function fetchContacts(): Promise<{ data: any }> {
  const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts?perPage=100', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()
  return result.results
}

export async function fetchCreateContact(data): Promise<{ data: any }> {
  const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({   firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone }),
  })
  const result = await response.json()

  return result
}

export async function fetchUpdateContact(data): Promise<{ data: any }> {
  const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts/'+data.id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({   firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone }),
  })
  const result = await response.json()

  return result
}

export async function fetchIndividualContact(id): Promise<{ data: string }> {
  const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts/'+id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result
}
