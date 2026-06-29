import subprocess
import sys
import os

def main():
    frontend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    os.chdir(frontend_dir)
    
    # Find npm in PATH
    import shutil
    npm_path = shutil.which("npm")
    
    if npm_path is None:
        print("Error: npm not found in PATH")
        sys.exit(1)
    
    cmd = [npm_path, "run", "dev", "--", "--host", "127.0.0.1", "--port", "5173"]
    
    print(f"Starting Vite dev server at http://127.0.0.1:5173/")
    subprocess.run(cmd)

if __name__ == "__main__":
    main()
