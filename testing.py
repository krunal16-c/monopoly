import tkinter as tk
from itertools import product

class QuantumTicTacToeGUI:
    def __init__(self):
        # ... (previous code)
        self.root = tk.Tk()

        self.swap_used = False  # Track whether the Quantum Swap has been used

        # Additional button for Quantum Swap
        self.swap_button = tk.Button(self.root, text='Quantum Swap', command=self.perform_quantum_swap)
        self.swap_button.grid(row=4, columnspan=3)

    def run(self):
        self.root.mainloop()

    def perform_quantum_swap(self):
        if not self.swap_used:
            # Allow players to select two positions for swapping
            self.swap_used = True
            self.player_label.config(text="Player: Select 2 positions for Quantum Swap")
            self.disable_buttons()

            # Bind the same function to the buttons for position selection
            for i, j in product(range(3), repeat=2):
                self.buttons[i][j].config(command=lambda row=i, col=j: self.on_swap_selection(row, col))

    def on_swap_selection(self, row, col):
        if self.board[row][col] == 'X':
            if not hasattr(self, 'swap_marker_1'):
                self.swap_marker_1 = (row, col)
                self.player_label.config(text="Player: Select 1 more position for Quantum Swap")
            elif not hasattr(self, 'swap_marker_2') and (row, col) != self.swap_marker_1:
                self.swap_marker_2 = (row, col)
                self.swap_markers()
        else:
            print("Please select a position with your marker (X) for Quantum Swap.")

    def swap_markers(self):
        # Swap the markers' positions
        self.board[self.swap_marker_1[0]][self.swap_marker_1[1]], self.board[self.swap_marker_2[0]][self.swap_marker_2[1]] = \
            self.board[self.swap_marker_2[0]][self.swap_marker_2[1]], self.board[self.swap_marker_1[0]][self.swap_marker_1[1]]

        # Update the GUI
        self.update_gui()

        # Reset the Quantum Swap state
        self.swap_used = False
        self.player_label.config(text="Player: O")
        self.enable_buttons()
        delattr(self, 'swap_marker_1')
        delattr(self, 'swap_marker_2')

    def disable_buttons(self):
        for i, j in product(range(3), repeat=2):
            self.buttons[i][j].config(state=tk.DISABLED)

    def enable_buttons(self):
        for i, j in product(range(3), repeat=2):
            self.buttons[i][j].config(state=tk.NORMAL)

    # ... (rest of the code remains unchanged)
    # add code for tic-tac-toe
    
    
     


# Run the Quantum Tic-Tac-Toe GUI
if __name__ == "__main__":
    gui = QuantumTicTacToeGUI()
    gui.run()
