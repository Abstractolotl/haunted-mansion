---
sidebar_position: 2
---

# Object

Object level actions.

## HideObjectAction

Trigger this Action to hide a specific object, making it invisible and not interactable.

### Example

```json
{
  "type": "hideObject",
  "options": {
    "id": "<OBJECT_ID>"
  }
}
```

## RevealObjectAction

Trigger this Action to reveal a specific object again. This is the oposite of hideObject, makes the object visible and interactable.

### Example

```json
{
  "type": "revealObject",
  "options": {
    "id": "<OBJECT_ID>"
  }
}
```

## ClickObjectAction

Trigger this Action to simulate the player clicking a specific Object. This will call all its Interactions.

### Example

```json
{
  "type": "clickObject",
  "options": {
    "id": "<OBJECT_ID>"
  }
}
```

:::danger[Note]

This action will not check if the object is visible or interactable. It will trigger the interactions regardless.

:::