import type { Meta, StoryObj } from "@storybook/react"
import React from "react"
import { z } from "zod"

import Form from "@/ui/Form/Form"
import FormSubmit from "@/ui/Form/FormSubmit"
import Input from "@/ui/Form/Input"
import Textarea from "@/ui/Form/Textarea"
import { createValidationSchema, validationPrimitives, validationRules } from "@/ui/Form/Validation"

const meta: Meta<typeof Form> = {
  title: "Ui/Form/Validation",
  component: Form,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Example set for building validation schemas with `zod`, `createValidationSchema`, `validationPrimitives`, and `validationRules`. Stories show only the visual effect; see the code to learn how to use these variants."
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="w-[42rem] p-6">
        <Story />
      </div>
    )
  ],
  tags: ["autodocs"]
}

export default meta

type Story = StoryObj<typeof Form>

const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value)

const basicZodSchema = () =>
  createValidationSchema({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    age: z
      .string()
      .min(1, "Age is required")
      .regex(/^\d+$/, "Age must contain only digits")
      .refine((value) => Number(value) >= 18, "18+ only"),
    about: z.string().min(10, "Minimum 10 characters").max(200, "Maximum 200 characters")
  })

export const CreateValidationSchemaWithBasicZod: Story = {
  name: "createValidationSchema + basic zod",
  parameters: {
    docs: {
      description: {
        story:
          "The simplest scenario: use only `zod` schemas and assemble the object via `createValidationSchema`. Useful for simple or small one-off forms whose rules are not reused. The schema is passed to `Form` via `validationSchema`, and errors are shown automatically on `Input` and `Textarea`."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        validationSchema={basicZodSchema()}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Schema 1 passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input label="Email" name="email" placeholder="name@example.com" isClearable />
        <Input label="Age" name="age" placeholder="18" formatter="numbers" isClearable />
        <Textarea label="About me" name="about" placeholder="Minimum 10 characters" minRows={3} />
        <FormSubmit>Validate</FormSubmit>
      </Form>
    )
  }
}

const primitivesAndRulesSchema = () =>
  createValidationSchema({
    email: validationPrimitives.email(),
    optionalEmail: validationPrimitives.optionalEmail(),
    password: validationRules.strongPassword(10)
  })

export const PrimitivesAndComplexRules: Story = {
  name: "Primitives and complex system rules",
  parameters: {
    docs: {
      description: {
        story:
          "This scenario uses ready-made rules from `validationPrimitives` and `validationRules`. Primitives cover the most common cases (required email, optional email, password); more complex rules (e.g. `strongPassword`) may build on primitives, combine several checks, and are usually more situation-specific."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        validationSchema={primitivesAndRulesSchema()}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Schema 2 passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input label="Work email" name="email" placeholder="name@example.com" isClearable />
        <Input
          label="Backup email (optional)"
          name="optionalEmail"
          placeholder="optional@example.com"
          isClearable
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Strong password"
          isClearable
        />
        <FormSubmit>Validate</FormSubmit>
      </Form>
    )
  }
}

const customRulesSchema = () =>
  createValidationSchema({
    username: z
      .string()
      .trim()
      .min(3, "Minimum 3 characters")
      .regex(/^[a-z0-9-]+$/, "Only a-z, 0-9, and hyphen are allowed")
      .refine((value) => !value.startsWith("-") && !value.endsWith("-"), "No hyphen at the edges"),
    corporateEmail: validationPrimitives
      .email()
      .refine((value) => value.endsWith("@example.com"), "Only the @example.com domain is allowed"),
    message: validationPrimitives
      .requiredString()
      .refine((value) => value.trim().length >= 20, "Minimum 20 characters of meaningful text")
  })

export const CustomComplexRules: Story = {
  name: "Custom complex rules",
  parameters: {
    docs: {
      description: {
        story:
          "For recurring fields you can define custom project rules. Example of custom rules built two ways: the first is pure `zod` (`username`), the second builds on `validationPrimitives` (`corporateEmail`, `message`)."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        validationSchema={customRulesSchema()}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Schema 3 passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input label="Username" name="username" placeholder="team-lead-1" isClearable />
        <Input
          label="Corporate email"
          name="corporateEmail"
          placeholder="user@example.com"
          isClearable
        />
        <Textarea
          label="Message"
          name="message"
          placeholder="Minimum 20 characters of meaningful text"
          minRows={4}
        />
        <FormSubmit>Validate</FormSubmit>
      </Form>
    )
  }
}

const completeSchema = () =>
  createValidationSchema({
    // Basic Zod rules
    profileEmail: z.string().min(1, "Email is required").email("Enter a valid email"),
    profileAge: z
      .string()
      .min(1, "Age is required")
      .regex(/^\d+$/, "Age must contain only digits"),

    // Ready primitives and system rules
    accountEmail: validationPrimitives.email(),
    accountPassword: validationRules.strongPassword(12),
    backupEmail: validationPrimitives.optionalEmail(),

    // Custom complex rules
    teamAlias: z
      .string()
      .min(3, "Minimum 3 characters")
      .regex(/^[a-z0-9-]+$/, "Only a-z, 0-9, and hyphen are allowed")
      .refine((value) => !value.includes("--"), "Double hyphen is not allowed"),
    managerEmail: validationPrimitives
      .email()
      .refine((value) => value.endsWith("@example.com"), "Corporate domain only"),
    extraComment: z.preprocess(
      emptyToUndefined,
      z.string().min(15, "If the field is filled, at least 15 characters are required").optional()
    )
  })

export const CompleteSchemaAllCases: Story = {
  name: "One schema with all approaches",
  parameters: {
    docs: {
      description: {
        story:
          "This story combines all approaches in one `validationSchema`: basic `zod` rules, ready-made primitives/rules, and custom complex checks."
      }
    }
  },
  render: () => {
    return (
      <Form
        gap="md"
        validationSchema={completeSchema()}
        onSubmit={(values) => {
          // eslint-disable-next-line no-alert
          alert(`Schema 4 passed:\n${JSON.stringify(values, null, 2)}`)
        }}
      >
        <Input
          label="Profile email (zod)"
          name="profileEmail"
          placeholder="name@example.com"
          isClearable
        />
        <Input
          label="Age (zod)"
          name="profileAge"
          placeholder="18"
          formatter="numbers"
          isClearable
        />
        <Input
          label="Account email (primitive)"
          name="accountEmail"
          placeholder="name@example.com"
          isClearable
        />
        <Input
          label="Account password (rule)"
          name="accountPassword"
          type="password"
          placeholder="At least 12 characters"
          isClearable
        />
        <Input
          label="Backup email (optional)"
          name="backupEmail"
          placeholder="optional@example.com"
          isClearable
        />
        <Input
          label="Team alias (custom zod)"
          name="teamAlias"
          placeholder="alpha-team"
          isClearable
        />
        <Input
          label="Manager email (custom + primitive)"
          name="managerEmail"
          placeholder="lead@example.com"
          isClearable
        />
        <Textarea
          label="Comment (optional preprocess)"
          name="extraComment"
          placeholder="If you fill the field, write at least 15 characters"
          minRows={3}
        />
        <FormSubmit>Validate entire schema</FormSubmit>
      </Form>
    )
  }
}
