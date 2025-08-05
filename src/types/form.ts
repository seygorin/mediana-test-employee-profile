export type FieldType = 'input' | 'radio' | 'date' | 'select' | 'checkboxlist'

export interface BaseField {
  type: FieldType
  label: string
  placeholder: string
  required: boolean
}

export interface InputField extends BaseField {
  type: 'input'
  value: string
}

export interface SelectField extends BaseField {
  type: 'select'
  value: string
  items: Record<string, string>
}

export interface RadioField extends BaseField {
  type: 'radio'
  value: string
  items: string[]
}

export interface CheckboxField extends BaseField {
  type: 'checkboxlist'
  value: string[]
  items: Record<string, string>
}

export interface DateField extends BaseField {
  type: 'date'
  value: string
}

export type Field =
  | InputField
  | SelectField
  | RadioField
  | CheckboxField
  | DateField

export interface FormBlock {
  [key: string]: Field
}

export interface FormGroup {
  title: string
  blocks: Record<string, FormBlock | Field[]>
	[key: string]: any
}

export interface FormData {
  groups: Record<string, FormGroup | Field[]>
}
