// INITIALISATION DE TABLEAU DE TACHE
let tableau_tache = [];

// Ajouter une nouvelle tâche
function validerTache(tache, description) {
    const tache_obj = {
        id: Date.now(), // Utiliser l'ID actuel comme identifiant unique
        tache,
        description,
        date: new Date()
    };

    tableau_tache.push(tache_obj); // ajouter le obj tache au tableau

    // Créer une nouvelle ligne dans le tableau
    const creerTr = document.createElement('tr');
    creerTr.draggable = true;
    creerTr.classList = 'dragged';

    const tacheCell = document.createElement('td');
    tacheCell.contentEditable = false;
    tacheCell.textContent = tache_obj.tache;
    //tacheCell.addEventListener('change', () => miseAjourTache(tache_obj.id, 'tache', tacheCell.textContent));
    creerTr.appendChild(tacheCell);

    const descriptionCell = document.createElement('td');
    descriptionCell.contentEditable = false;
    descriptionCell.textContent = tache_obj.description;
    //descriptionCell.addEventListener('change', () => miseAjourTache(tache_obj.id, 'description', descriptionCell.textContent));
    creerTr.appendChild(descriptionCell);

    const dateCell = document.createElement('td');
    dateCell.textContent = tache_obj.date.toLocaleString();
    creerTr.appendChild(dateCell);

    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.classList = 'btn btn-danger';
    deleteBtn.addEventListener('click', () => deleteTache(tache_obj.id, creerTr));

    const modifyBtn = document.createElement('button');
    modifyBtn.textContent = 'Modifier';
    modifyBtn.classList = 'btn btn-success';
    modifyBtn.addEventListener('click', () => miseAjourTache(tache_obj.id, 'tache', tacheCell.textContent));

    actionCell.appendChild(modifyBtn);
    actionCell.appendChild(deleteBtn);
    creerTr.appendChild(actionCell);

    // Ajouter la nouvelle ligne dans le tableau
    document.getElementById('contenir-tache').appendChild(creerTr);

    // Sauvegarder les tâches dans le localStorage
    sauverLocalStorage();
    dragAndDrop();
}

// METTRE A JOUR UNE TACHE
function miseAjourTache(tacheId, valeur, newValeur) {
    const valFinal = prompt("Mise a jour a faire");
    const tache = tableau_tache.find(tache => tache.id == tacheId);
    if (tache) {
        tache[valeur] = valFinal; // Mettre à jour le champ spécifique (titre ou description)
        console.log('Mise à jour fait');
        sauverLocalStorage();
    }
}

// SUPPRIMER UNE TACHE
function deleteTache(tacheId, tr) {
    tableau_tache = tableau_tache.filter(tache => tache.id !== tacheId); // Supprimer la tâche du tableau
    tr.remove(); // Supprimer la ligne du tableau
    sauverLocalStorage();
}

// SAUVEGARDER A LA localstorage
function sauverLocalStorage() {
    localStorage.setItem('taches', JSON.stringify(tableau_tache));
}

// CHARGER LES TACHE AU MOMENT DE DEMARRAGE
function loadTache() {
    const getTache = JSON.parse(localStorage.getItem('taches')) || [];
    tableau_tache = getTache;
    getTache.forEach(tache => {
        const creerTr = document.createElement('tr');
        creerTr.draggable = true;
        creerTr.classList = 'dragged';
        const tacheCell = document.createElement('td');
        tacheCell.contentEditable = false;
        tacheCell.textContent = tache.tache;
        //tacheCell.addEventListener('change', () => miseAjourTache(tache.id, 'tache', tacheCell.textContent));
        creerTr.appendChild(tacheCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.contentEditable = false;
        descriptionCell.textContent = tache.description;
        //descriptionCell;addEventListener('change', () => miseAjourTache(tache.id, 'description', descriptionCell.textContent));
        creerTr.appendChild(descriptionCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = tache.date.toLocaleString();
        creerTr.appendChild(dateCell);

        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.classList = 'btn btn-danger';
        deleteBtn.addEventListener('click', () => deleteTache(tache.id, creerTr));

        const modifyBtn = document.createElement('button');
        modifyBtn.textContent = 'Modifier';
        modifyBtn.classList = 'btn btn-success';
        modifyBtn.addEventListener('click', () => miseAjourTache(tache.id, 'tache', tacheCell.textContent));

        actionCell.appendChild(modifyBtn);
        actionCell.appendChild(deleteBtn);
        creerTr.appendChild(actionCell);

        document.getElementById('contenir-tache').appendChild(creerTr);
    });
    dragAndDrop();
}

// RECHERCHE LES TACHE PAR MOT-CLés
function recherche() {
    const motCle = document.getElementById('recherche').value.toLowerCase();
    const filtrerTache = tableau_tache.filter(tache =>
        tache.tache.toLowerCase().includes(motCle) || tache.description.toLowerCase().includes(motCle)
    )

    // effacer tout les lignes existants
    const tbody = document.getElementById('contenir-tache');
    tbody.innerHTML = '';

    // afficher les taches filtrées
    filtrerTache.forEach(tache => {
        const creerTr = document.createElement('tr');
        creerTr.draggable = true;
        creerTr.classList = 'dragged';
        const tacheCell = document.createElement('td');
        tacheCell.contentEditable = false;
        tacheCell.textContent = tache.tache;
        //tacheCell.addEventListener('change', () => miseAjourTache(tache.id, 'tache', tache.tache));
        creerTr.appendChild(tacheCell);

        const descriptionCell = document.createElement('td');
        descriptionCell.contentEditable = false;
        descriptionCell.textContent = tache.description;
        //descriptionCell.addEventListener('change', () => miseAjourTache(tache.id, 'description', descriptionCell.textContent));
        creerTr.appendChild(descriptionCell);

        const dateCell = document.createElement('td');
        dateCell.textContent = tache.date.toLocaleString();
        creerTr.appendChild(dateCell);

        const actionCell = document.createElement('td');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.classList = 'btn btn-danger';
        deleteBtn.addEventListener('click', () => deleteTache(tache.id, creerTr));

        const modifyBtn = document.createElement('button');
        modifyBtn.textContent = 'Modifier';
        modifyBtn.classList = 'btn btn-success';
        modifyBtn.addEventListener('click', () => miseAjourTache(tache.id, 'tache', tacheCell.textContent));

        actionCell.appendChild(modifyBtn);
        actionCell.appendChild(deleteBtn);
        creerTr.appendChild(actionCell);

        tbody.appendChild(creerTr);
    });
    dragAndDrop();
}

// TRIER PAR DATE D'AJOUT
function sortDate() {
    tableau_tache.sort((a,b) => b.date - a.date); // Trier par date décroissante
    sauverLocalStorage(); // Sauver apres tri
    loadTache(); // Recharge de la tache triées
}

// DRAG and DROP
function dragAndDrop() {
    const deplaces = document.querySelectorAll('.dragged');
    let dragged;

    for (const deplace of deplaces) {
        deplace.ondragstart  = (e) => {
            dragged = deplace;
            e.dataTransfer.setData('text/plain', deplace.innerHTML);
        }

        deplace.ondragover = (e) => {
            e.preventDefault();
        }

        deplace.ondrop = (e) => {
            dragged.innerHTML = deplace.innerHTML;
            deplace.innerHTML = e.dataTransfer.getData('text/plain');
        }
    }
    sauverLocalStorage();
}

// EVENEMENT AJOUTER DANS LE TABLEAU
document.getElementById('form-tache').addEventListener('submit', function(e) {
    e.preventDefault();
    const tache = document.getElementById('tache').value.trim();
    const description = "Non completée";
    //document.getElementById('description').value.trim();
    validerTache(tache, description);

    // Réinitialiser les champs du formulaire
    document.getElementById('tache').value = '';
    //document.getElementById('description').value = '';
})

//CHARGER LES TACHES AU DEMARRAGE
window.addEventListener('load', loadTache);