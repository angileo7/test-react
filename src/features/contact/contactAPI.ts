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

export async function deleteContact(id): Promise<{ data: string }> {
  const response = await fetch('https://bkbnchallenge.herokuapp.com/contacts/'+id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await response.json()

  return result
}