function handleClick(event) {
            const buttonId = event.target.id;
            switch (buttonId) {
                case 'viewBtn':
                    
                    console.log('View all books');
                    break;
                case 'addBtn':
                    
                    console.log('Add new books');
                    break;
                case 'updateBtn':
                    
                    console.log('Update existing books');
                    break;
                case 'deleteBtn':
                    
                    console.log('Delete books');
                    break;
                default:
                    console.log('Unknown button clicked');
            }
        }
        document.getElementById('viewBtn').addEventListener('click', handleClick);
        document.getElementById('addBtn').addEventListener('click', handleClick);
        document.getElementById('updateBtn').addEventListener('click', handleClick);
        document.getElementById('deleteBtn').addEventListener('click', handleClick);