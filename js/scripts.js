var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
    if(!sidebarOpen) {
        sidebar.classList.add("sidebar-responsive");
        sidebarOpen = true;
    }
}

function closeSidebar() {
    if(sidebarOpen) {
        sidebar.classList.remove("sidebar-responsive");
        sidebarOpen = false;
    }
}

// -------- Charts -------- //

// Dados de exemplo para o gráfico (substitua com os dados reais de umidade e timestamps)
var dates = [
    [1698675600000, 50], // timestamp e umidade
    [1698679200000, 55],
    [1698682800000, 52],
    [1698686400000, 60],
    [1698690000000, 58]
];

var options = {
    series: [{
        name: 'Umidade do Solo',
        data: dates // Substitua "dates" pelos seus dados de umidade com timestamps
    }],
    chart: {
        type: 'area',
        stacked: false,
        height: 350,
        zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
        },
        toolbar: {
            autoSelected: 'zoom'
        }
    },
    dataLabels: {
        enabled: false
    },
    markers: {
        size: 0
    },
    title: {
        text: 'Umidade do Solo',
        align: 'left'
    },
    fill: {
        type: 'gradient',
        gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100]
        }
    },
    yaxis: {
        labels: {
            formatter: function (val) {
                return val.toFixed(0); // Remove o divisor por 1.000.000 para exibir a umidade diretamente
            }
        },
        title: {
            text: 'Umidade (%)'
        }
    },
    xaxis: {
        type: 'datetime',
        labels: {
            format: 'HH:mm' // Mostra apenas as horas e minutos
        }
    },
    tooltip: {
        shared: false,
        x: {
            format: 'HH:mm' // Formato da hora no tooltip
        },
        y: {
            formatter: function (val) {
                return val.toFixed(0) + '%'; // Mostra o valor da umidade como porcentagem
            }
        }
    }
};

var lineChart = new ApexCharts(document.querySelector("#line-chart"), options);
lineChart.render();

//------- Plant -------//

// Função para habilitar a edição do nome da planta
function enableEdit() {
    const displaySpan = document.getElementById("plant-name-display");
    const inputField = document.getElementById("plant-name-input");
    
    // Alterna a visibilidade entre o campo de visualização e o de entrada
    displaySpan.style.display = "none";
    inputField.style.display = "inline-block";
    inputField.focus(); // Foca no campo de entrada para edição
}

// Função para salvar o novo nome da planta e atualizar na interface e API
async function saveEdit() {
    const displaySpan = document.getElementById("plant-name-display");
    const inputField = document.getElementById("plant-name-input");
    const newName = inputField.value;
    
    // Salva o nome da planta no display e alterna a visibilidade
    displaySpan.innerText = newName;
    displaySpan.style.display = "inline-block";
    inputField.style.display = "none";

    // Aqui você pode chamar a função para atualizar o nome na API
    await updatePlantNameAPI(newName);
}

// Função para atualizar o nome da planta na API
async function updatePlantNameAPI(newName) {
    try {
        const response = await fetch(`http://localhost:3000/plants/1`, { // Atualize com o ID da planta
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: newName })
        });
        if (!response.ok) {
            console.error("Erro ao atualizar o nome da planta na API.");
        }
    } catch (error) {
        console.error("Erro ao fazer requisição para a API:", error);
    }
}

