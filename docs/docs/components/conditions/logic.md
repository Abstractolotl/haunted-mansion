---
sidebar_position: 2
---

# Logic

Logic Conditions allow you to combine multiple Conditions into a single Condition.

## OrCondition

This Condition takes a list of input conditions and returns true only if at least one returns true.

### Example

```json
{
  "type": "or",
  "options": {
    "conditions": [
      <CONDITION>,
      <CONDITION>
    ]
  }
}
```
:::tip[Note]

This Condition explicitly supports more than two conditions.

:::

## NorCondition

This Condition takes a list of input conditions and returns true only if none of the conditions return true.

### Example

```json
{
  "type": "nor",
  "options": {
    "conditions": [
      <CONDITION>,
      <CONDITION>
    ]
  }
}
```
:::tip[Note]

This Condition explicitly supports more than two conditions.

:::

## XorCondition

This Condition takes a list of input conditions and returns true only if exactly one condition returns true.

### Example

```json
{
  "type": "xor",
  "options": {
    "conditions": [
      <CONDITION>,
      <CONDITION>
    ]
  }
}
```
:::tip[Note]

This Condition explicitly supports more than two conditions.

:::

## AndCondition

This Condition takes a list of input conditions and returns true only if all conditions return true.

### Example

```json
{
  "type": "and",
  "options": {
    "conditions": [
      <CONDITION>,
      <CONDITION>
    ]
  }
}
```
:::tip[Note]

This Condition explicitly supports more than two conditions.

:::

## NotCondition

This Condition takes a single input condition and returns true only if the input condition returns false.

### Example

```json
{
  "type": "not",
  "options": {
    "condition": <CONDITION>
  }
}
```