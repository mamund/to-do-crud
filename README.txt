TO-DO CRUD EXAMPLE

Problem Domain
The following should be possible:
 * Get a list of to-do items
 * Make a to-do item 'complete'
 * Add new to-do items
 * Filter the list of to-do items (based on the text)

A single to-do item has the following properties:
 * id (internal unique id)
 * text (visible text of the item)

Getting Things Done w/ the To-Do Example
Client applications can use this Service to do the following:
 * Get a list of to-do items (GET /to-do/)
 * Mark an existing to-do item complete (POST /to-do/complete/)
 * Add a new to-do item (POST /to-do/)
 * Filter the list of to-do items (GET /to-do/search?text={@text})

TO-DO URI List
The TO-DO service represents a single to-do item as follows:
  * {id:n, text:'...'}

The TO-DO service uses URIs + HTTP methods to handle the actions
  * /to-do/
    Uses HTTP.GET on the URI.

  * /to-do/
    Use HTTP.POST on the URI in href with the following:
    Content-type: appliction/x-www-form-urlencoded
    text={@text}

  * /to-do/search?text={@text}
    Use HTTP.GET on the URI in href
    Include the search text in {@text} of the URI

  * /to-do/complete/
    Use HTTP.POST on the URI in the href
    Content-type: application/x-www-form-urlencode
    id={@id}

A complete response has a single array of to-do items and looks like this:
{
  [
    {id:n, text:'...'},
    {id:n, text:'...'}
  ]
}