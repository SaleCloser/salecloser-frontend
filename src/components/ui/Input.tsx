"use client";

import React, { forwardRef, useId, useState } from "react";
import { RiEyeLine, RiEyeOffLine, RiCloseLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputVariant = "default" | "filled" | "ghost";
export type InputSize = "sm" | "md" | "lg";

export interface InputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size" | "prefix"
> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  successMessage?: string;
  variant?: InputVariant;
  inputSize?: InputSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  clearable?: boolean;
  onClear?: () => void;
  loading?: boolean;
  showCharCount?: boolean;
  containerClass?: string;
  labelClass?: string;
  wrapperClass?: string;
}

// ─── Style maps ───────────────────────────────────────────────────────────────

const SIZE_WRAPPER: Record<InputSize, string> = {
  sm: "px-3 py-1.5 gap-2 rounded-lg text-xs",
  md: "px-3.5 py-2.5 gap-2.5 rounded-xl text-sm",
  lg: "px-4 py-3 gap-3 rounded-xl text-base",
};

const SIZE_ICON: Record<InputSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const SIZE_LABEL: Record<InputSize, string> = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
};

const VARIANT_BASE: Record<InputVariant, string> = {
  default:
    "border bg-[var(--input-bg)] border-[var(--input-border)] " +
    "hover:border-[var(--input-border-hover)] " +
    "focus-within:border-[var(--input-border-focus)] " +
    "focus-within:shadow-[0_0_0_3px_var(--input-ring)]",

  filled:
    "border border-transparent bg-[var(--input-bg-filled)] " +
    "focus-within:shadow-[0_0_0_3px_var(--input-ring)]",

  ghost:
    "border border-transparent bg-transparent hover:bg-[var(--input-bg-ghost)] " +
    "focus-within:shadow-[0_0_0_3px_var(--input-ring)]",
};

// ─── Component ────────────────────────────────────────────────────────────────

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      successMessage,
      variant = "default",
      inputSize = "md",
      leftIcon,
      rightIcon,
      prefix,
      suffix,
      clearable = false,
      onClear,
      loading = false,
      showCharCount = false,
      containerClass,
      labelClass,
      wrapperClass,
      type = "text",
      value,
      defaultValue,
      onChange,
      disabled,
      maxLength,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const uid = useId();
    const inputId = id ?? uid;
    const isPassword = type === "password";
    const isControlled = value !== undefined;

    const [showPwd, setShowPwd] = useState(false);
    const [internal, setInternal] = useState(String(defaultValue ?? ""));

    const currentValue = isControlled ? String(value ?? "") : internal;
    const inputType = isPassword ? (showPwd ? "text" : "password") : type;

    const subText = errorMessage ?? successMessage ?? helperText;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.value);
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) setInternal("");
      onClear?.();
    };

    let rightSlot: React.ReactNode = null;

    const iconCls = [SIZE_ICON[inputSize], "shrink-0"]
      .filter(Boolean)
      .join(" ");

    const btnCls =
      "shrink-0 transition-colors focus:outline-none text-[var(--input-icon)] hover:text-[var(--input-icon-focus)]";

    if (loading) {
      rightSlot = (
        <AiOutlineLoading3Quarters
          className={[iconCls, "animate-spin text-[var(--input-icon)]"]
            .filter(Boolean)
            .join(" ")}
        />
      );
    } else if (isPassword) {
      const PwdIcon = showPwd ? RiEyeOffLine : RiEyeLine;
      rightSlot = (
        <button
          type="button"
          tabIndex={-1}
          aria-label={showPwd ? "Hide password" : "Show password"}
          onClick={() => setShowPwd((p) => !p)}
          className={btnCls}
        >
          <PwdIcon className={iconCls} />
        </button>
      );
    } else if (clearable && currentValue.length > 0) {
      rightSlot = (
        <button
          type="button"
          tabIndex={-1}
          aria-label="Clear input"
          onClick={handleClear}
          className={btnCls}
        >
          <RiCloseLine className={iconCls} />
        </button>
      );
    } else if (rightIcon) {
      rightSlot = (
        <span
          className={[iconCls, "text-[var(--input-icon)]"]
            .filter(Boolean)
            .join(" ")}
        >
          {rightIcon}
        </span>
      );
    }

    return (
      <div
        className={["flex w-full flex-col gap-1.5", containerClass]
          .filter(Boolean)
          .join(" ")}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={[
              "select-none font-medium text-[var(--input-label)] transition-colors",
              SIZE_LABEL[inputSize],
              disabled && "cursor-not-allowed opacity-50",
              labelClass,
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
            {props.required && (
              <span
                aria-hidden="true"
                className="ml-0.5 text-[var(--input-border-error)]"
              >
                *
              </span>
            )}
          </label>
        )}

        <div
          className={[
            "flex w-full items-center transition-all duration-150",
            SIZE_WRAPPER[inputSize],
            VARIANT_BASE[variant],
            disabled && "pointer-events-none cursor-not-allowed opacity-50",
            wrapperClass,
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {leftIcon && (
            <span
              className={[
                "shrink-0 text-[var(--input-icon)] transition-colors duration-150",
                SIZE_ICON[inputSize],
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {leftIcon}
            </span>
          )}

          {prefix && (
            <span className="shrink-0 select-none text-[var(--input-placeholder)]">
              {prefix}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            type={inputType}
            value={isControlled ? (value as string) : internal}
            onChange={handleChange}
            disabled={disabled}
            maxLength={maxLength}
            aria-describedby={subText ? `${inputId}-desc` : undefined}
            className={[
              "min-w-0 flex-1 bg-transparent outline-none",
              "text-[var(--text-primary)] placeholder:text-[var(--input-placeholder)]",
              "disabled:cursor-not-allowed",
              className,
            ]
              .filter(Boolean)
              .join(" ")}
            {...props}
          />

          {suffix && (
            <span className="shrink-0 select-none text-[var(--input-placeholder)]">
              {suffix}
            </span>
          )}

          {rightSlot}
        </div>

        {(subText || (showCharCount && maxLength)) && (
          <div
            id={subText ? `${inputId}-desc` : undefined}
            className="flex items-start justify-between gap-2"
          >
            {subText ? (
              <p className="text-xs leading-snug text-[var(--input-helper)]">
                {subText}
              </p>
            ) : (
              <span />
            )}

            {showCharCount && maxLength && (
              <span
                aria-live="polite"
                aria-label={`${currentValue.length} of ${maxLength} characters`}
                className={[
                  "shrink-0 tabular-nums text-xs",
                  currentValue.length >= maxLength
                    ? "text-[var(--input-border-error)]"
                    : "text-[var(--input-counter)]",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {currentValue.length} / {maxLength}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
