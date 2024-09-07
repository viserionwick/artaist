"use client"

// Essentials
import { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

// Contexts
import { useResultsContext } from "./(contexts)/Results";

// Hooks
import useArtRequestForm from "./(hooks)/useArtRequestForm";

// Models
import { artRequestFormDefault } from "../models/ArtRequestForm";

// Components: UI
import * as Form from "@radix-ui/react-form";
import RadioButtons from "./(components)/ui/Radio/RadioButtons";
import RadioButton from "./(components)/ui/Radio/RadioButton";
import Slider from "./(components)/ui/Slider";
import TextArea from "./(components)/ui/TextArea";
import TextField from "./(components)/ui/TextField";
import Button from "./(components)/ui/Button";

const Home: NextPage = () => {
  const { formData, setFormData, handleChange } = useArtRequestForm();
  const { setArtRequestForm } = useResultsContext();
  const router = useRouter();

  // Default the states on navigation.
  useEffect(() => {
    setArtRequestForm(null);
  }, [router]);

  // Default the prompts and bulk amount on production switch.
  useEffect(() => {
    setFormData({
      ...formData,
      bulkAmount: artRequestFormDefault.bulkAmount,
      prompts: [formData.prompts[0]]
    });
  }, [formData.production]);

  // Add new prompt.
  const addNewPromptSet = () => {
    setFormData({
      ...formData,
      prompts: [...formData.prompts, artRequestFormDefault.prompts[0]]
    })
  }

  // Handle submission.
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setArtRequestForm(formData);

    // Set cookie for access to results page.
    const formDataString = JSON.stringify(formData);
    document.cookie = `artRequestForm=${encodeURIComponent(formDataString)}; path=/`;

    router.push("/results");

    console.log("formData: ", formData);

  };

  return (
    <div className="p-Home">
      <Form.Root onSubmit={handleSubmit}>
        <h5>AI Model</h5>
        <RadioButtons name="model" defaultValue="zappy" onChange={handleChange}>
          <RadioButton value="zappy" id="model_zappy">
            Zappy
          </RadioButton>
          <RadioButton value="masterpiece" id="model_masterpiece">
            Masterpiece
          </RadioButton>
        </RadioButtons>

        <h5>Production Type</h5>
        <RadioButtons name="production" defaultValue="bulk" onChange={handleChange}>
          <RadioButton value="bulk" id="production_bulk">
            Bulk Generation
          </RadioButton>
          <RadioButton value="queue" id="production_queue">
            Queue Generation
          </RadioButton>
        </RadioButtons>

        {
          formData.production === "bulk" && <>
            <h5>Number of Production</h5>
            <Slider
              name="bulkAmount"
              onChange={handleChange}
              defaultValue={[artRequestFormDefault.bulkAmount]}
              min={0}
              max={10}
              step={5}
            />
            <div>
              1 | 5 | 10
            </div>
          </>
        }

        <h5>Prompt Area</h5>
        <div>
          {
            formData.prompts.map((prompt, promptIndex) => (
              <div key={promptIndex}>
                {
                  promptIndex !== 0 &&
                  <Button name="deletePrompt" onClick={(e) => handleChange(e, promptIndex)}>
                    Delete
                  </Button>
                }

                <TextArea
                  name={`prompt-${promptIndex}`}
                  required
                  placeholder="A cute rabbit, white background, pastel hues, minimal illustration, line art, pen drawing"
                  valueMissing="Please enter a prompt."
                  value={prompt.prompt}
                  onChange={(e) => handleChange(e, promptIndex)}
                />
                <TextField
                  name={`style-${promptIndex}`}
                  placeholder="Style (Optional)"
                  value={prompt.style}
                  onChange={(e) => handleChange(e, promptIndex)}
                />
              </div>
            ))
          }

        </div>

        {
          formData.production === "queue" &&
          <Button onClick={addNewPromptSet}>+Add Prompt to Queue</Button>
        }
        <Form.Submit>
          Submit
        </Form.Submit>
      </Form.Root>
    </div>
  )
}

export default Home;