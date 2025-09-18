import { useState } from 'react';
import { ChatbotUI } from './ChatbotUI';

export const FloatingSmiley = () => {
  const [open, setOpen] = useState(false);

  return (
    <ChatbotUI
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button className="floating-smiley animate-scale-in">
          😊
        </button>
      }
    />
  );
};