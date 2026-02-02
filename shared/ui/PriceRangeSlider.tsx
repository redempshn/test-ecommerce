"use client";

import React, { useCallback, useState, useRef } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  trackColor?: string;
  onChange: (values: { min: number; max: number }) => void;
  rangeColor?: string;
  currencyText?: string;
  initialMin?: number;
  initialMax?: number;
}

const PriceRangeSlider = ({
  min,
  max,
  trackColor = "#e5e7eb",
  onChange,
  rangeColor = "#3b82f6",
  currencyText = "$",
  initialMin,
  initialMax,
}: PriceRangeSliderProps) => {
  const [displayMin, setDisplayMin] = useState(initialMin ?? min);
  const [displayMax, setDisplayMax] = useState(initialMax ?? max);

  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  // Текущие значения без state
  const currentValues = useRef({
    min: initialMin ?? min,
    max: initialMax ?? max,
  });

  const updateRangeVisual = useCallback(
    (newMin: number, newMax: number) => {
      const minPercent = Math.round(((newMin - min) / (max - min)) * 100);
      const maxPercent = Math.round(((newMax - min) / (max - min)) * 100);

      if (rangeRef.current) {
        rangeRef.current.style.left = `${minPercent}%`;
        rangeRef.current.style.width = `${maxPercent - minPercent}%`;
      }
    },
    [min, max],
  );

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(
      Number(e.target.value),
      currentValues.current.max - 1,
    );
    currentValues.current.min = value;
    updateRangeVisual(value, currentValues.current.max);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(
      Number(e.target.value),
      currentValues.current.min + 1,
    );
    currentValues.current.max = value;
    updateRangeVisual(currentValues.current.min, value);
  };

  const handleRelease = () => {
    setDisplayMin(currentValues.current.min);
    setDisplayMax(currentValues.current.max);
    onChange({
      min: currentValues.current.min,
      max: currentValues.current.max,
    });
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? min : Number(e.target.value);
    if (value >= min && value < displayMax) {
      setDisplayMin(value);
      currentValues.current.min = value;
      updateRangeVisual(value, displayMax);
      onChange({ min: value, max: displayMax });
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? max : Number(e.target.value);
    if (value <= max && value > displayMin) {
      setDisplayMax(value);
      currentValues.current.max = value;
      updateRangeVisual(displayMin, value);
      onChange({ min: displayMin, max: value });
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currencyText}
            </span>
            <input
              type="number"
              value={displayMin}
              onChange={handleMinInputChange}
              min={min}
              max={displayMax - 1}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="pt-8 text-gray-400">—</div>

        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              {currencyText}
            </span>
            <input
              type="number"
              value={displayMax}
              onChange={handleMaxInputChange}
              min={displayMin + 1}
              max={max}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="relative pt-2 pb-6">
        <input
          ref={minInputRef}
          type="range"
          min={min}
          max={max}
          defaultValue={displayMin}
          onChange={handleMinChange}
          onMouseUp={handleRelease}
          onTouchEnd={handleRelease}
          className="thumb thumb--left"
          style={{
            zIndex: displayMin > max - 100 ? 5 : 3,
          }}
        />

        <input
          ref={maxInputRef}
          type="range"
          min={min}
          max={max}
          defaultValue={displayMax}
          onChange={handleMaxChange}
          onMouseUp={handleRelease}
          onTouchEnd={handleRelease}
          className="thumb thumb--right"
          style={{
            zIndex: displayMin > max - 100 ? 4 : 3,
          }}
        />

        <div className="slider relative h-1">
          <div
            className="slider__track absolute h-full rounded-full w-full"
            style={{ backgroundColor: trackColor }}
          />
          <div
            ref={rangeRef}
            className="slider__range absolute h-full rounded-full"
            style={{ backgroundColor: rangeColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
