import {z} from 'zod'

export const todoInput  = z.string({
    required_error:'Describe todo'
}).min(1).max(50)