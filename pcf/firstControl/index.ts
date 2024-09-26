import { IInputs, IOutputs } from "./generated/ManifestTypes";

export class firstControl implements ComponentFramework.StandardControl<IInputs, IOutputs> {
    private _container: HTMLDivElement;
    private _input: HTMLInputElement;
    private _dropdown: HTMLDivElement;
    private _context: ComponentFramework.Context<IInputs>;

    constructor() {}

    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container: HTMLDivElement) {
        this._context = context;
        this._container = document.createElement("div");
        this._input = document.createElement("input");
        this._input.setAttribute("type", "text");
        this._input.setAttribute("placeholder", "Enter Pincode");

        this._dropdown = document.createElement("div");
        this._dropdown.style.position = "absolute";
        this._dropdown.style.border = "1px solid #ccc";
        this._dropdown.style.backgroundColor = "#fff";
        this._dropdown.style.zIndex = "1000";
        this._dropdown.style.display = "none";

        this._input.addEventListener("input", this.onInputChange.bind(this));
        document.addEventListener("click", this.onDocumentClick.bind(this));

        this._container.appendChild(this._input);
        this._container.appendChild(this._dropdown);
        container.appendChild(this._container);
    }

    private async onInputChange(event: Event): Promise<void> {
        const pincode = (event.target as HTMLInputElement).value;
        if (pincode.length === 6) { // Assuming a valid pincode length is 6
            const addresses = await this.fetchAddresses(pincode);
            this.updateDropdown(addresses);
        } else {
            this._dropdown.style.display = "none";
        }
    }

    // Dummy response instead of a real API call
    private async fetchAddresses(pincode: string): Promise<string[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    "123 Fake Street, Springfield",
                    "456 Elm Street, Springfield",
                    "789 Maple Avenue, Springfield"
                ]);
            }, 100); // Simulate network delay
        });
    }

    private updateDropdown(addresses: string[]): void {
        while (this._dropdown.firstChild) {
            this._dropdown.removeChild(this._dropdown.firstChild);
        }

        addresses.forEach(address => {
            const div = document.createElement("div");
            div.textContent = address;
            div.style.padding = "5px";
            div.style.cursor = "pointer";
            div.addEventListener("click", () => this.onAddressClick(address));
            this._dropdown.appendChild(div);
        });

        if (addresses.length > 0) {
            this._dropdown.style.display = "block";
        } else {
            this._dropdown.style.display = "none";
        }
    }

    private onAddressClick(address: string): void {
        alert(address);
        this._dropdown.style.display = "none";
    }

    private onDocumentClick(event: MouseEvent): void {
        if (!this._container.contains(event.target as Node)) {
            this._dropdown.style.display = "none";
        }
    }

    public updateView(context: ComponentFramework.Context<IInputs>): void {
        // Update the view based on the updated context
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        document.removeEventListener("click", this.onDocumentClick.bind(this));
    }
}
